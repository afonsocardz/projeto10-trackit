import axios from "axios";
import { useEffect, useState } from "react";
import API from "../API";
import { useUserContext } from "../contexts/UserContext";
import deleteIcon from '../assets/imgs/delete-icon.svg'
import styled from "styled-components";
import Button from "../components/styles/Button";
import TitlePage from "../components/styles/TitlePage";
import Input from "../components/styles/Input";
import Container from "../components/styles/Container";
import { ThreeDots } from "react-loader-spinner";

const daysObj = [
    {
        id: 0,
        letter: "D",
        check: false
    },
    {
        id: 1,
        letter: "S",
        check: false
    },
    {
        id: 2,
        letter: "T",
        check: false
    },
    {
        id: 3,
        letter: "Q",
        check: false
    },
    {
        id: 4,
        letter: "Q",
        check: false
    },
    {
        id: 5,
        letter: "S",
        check: false
    },
    {
        id: 6,
        letter: "S",
        check: false
    },

]

function DayInput({ day, handler, status }) {
    const [isCheck, setIsCheck] = useState();
    console.log(status)

    function checkDay(status) {
        setIsCheck(status);
        handler(status, day.id);
    }

    return (
        <>
            <Checkbox isCheck={!status ? isCheck : day.check} isDisable={status} onClick={() => checkDay(!isCheck)}>
                <span>{day.letter}</span>
            </Checkbox>
        </>
    );
}

function HabitForm({ user, setUser, setDisplay }) {
    const [habitName, setHabitName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [days, setDays] = useState(daysObj);

    function addHabit(name, days) {
        const body = {
            name,
            days, // segunda, quarta e sexta
        }
        const promise = axios.post(`${API}/habits`, body, user.token);
        setIsLoading(true);
        promise.then(res => {
            const { data } = res;
            user.habits.push(data)
            setUser({ ...user, habits: user.habits });
            setDisplay(false);
            setIsLoading(false);
            setHabitName("");
            setDays(daysObj);
        }).catch(err => {
            const {response} = err;
            const {data} = response;
            const {details} = data;
            console.log(err);
            setIsLoading(false);
            alert(details[0])
        })
    }

    function checkHandler(status, id) {
        const checkDay = days.map(({ id: userId, letter, check }) => userId == id ? { id: userId, letter: letter, check: status } : { id: userId, letter: letter, check: check });
        setDays(checkDay);
    }

    function submitHandler(e) {
        e.preventDefault();
        const checkedDays = days.filter(({ check }) => check === true);
        addHabit(habitName, checkedDays.map(day => day.id));
    }

    return (
        <FormContainer direction={"column"} onSubmit={submitHandler}>
            <Input isLoading={isLoading} value={habitName} onChange={(e) => setHabitName(e.target.value)} />
            <DaysOptions>
                {days.map((day, index) => <DayInput day={day} index={index} handler={checkHandler} />)}
            </DaysOptions>
            <AlignLeft>
                <span onClick={() => setDisplay(false)}>Cancelar</span>
                <Button width={"84px"} height={"35px"} isLoading={isLoading}>{isLoading ? <ThreeDots color={"white"} height={"35"} /> : "Salvar"}</Button>
            </AlignLeft>
        </FormContainer>
    );
}

function OneHabit({ id, name, days, user, setUser }) {
    const [inputDays, setInputDays] = useState(daysObj);
    const [display, setDisplay] = useState(false);

    const newDays = inputDays.map(inDay => days.includes(inDay.id) ?
        { id: inDay.id, letter: inDay.letter, check: true } :
        { id: inDay.id, letter: inDay.letter, check: false });

    console.log(newDays);

    function deleteHabit(id) {
        const promise = axios.delete(`${API}/habits/${id}`, user.token);
        promise.then(res => {
            const newHabits = user.habits.filter(habit => habit.id !== id)
            const { status } = res;
            setUser({ ...user, habits: newHabits });
            setDisplay(false);
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    function submitHandler() {
        deleteHabit(id);
    }

    return (
        <>
            {display && <ConfirmDelete submitHandler={submitHandler} setDisplay={setDisplay} />}
            <FormContainer direction={"row"} onSubmit={submitHandler}>
                <HabitContainer direction={"column"}>
                    <span>{name}</span>
                    <DaysOptions>
                        {newDays.map((day) => <DayInput day={day} status={true} />)}
                    </DaysOptions>
                </HabitContainer>
                <img style={{ marginLeft: "auto", marginBottom: "auto", cursor: "pointer" }} onClick={() => setDisplay(true)} src={deleteIcon} alt={"Deletar Hábito"} />
            </FormContainer>
        </>

    );
}

function ConfirmDelete({ setDisplay, submitHandler }) {
    return (
        <DeleteModal>
            <span>Você realmente quer apagar esse hábito?</span>
            <div style={{ display: "flex" }}>
                <Button width={"85px"} height={"35px"} onClick={submitHandler}>Sim</Button>
                <Button width={"85px"} height={"35px"} color={true} onClick={() => setDisplay(false)}>Não</Button>
            </div>
        </DeleteModal>
    );

}

export default function Habits() {
    const { user, setUser } = useUserContext();
    const [habits, setHabits] = useState([]);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        const promise = axios.get(`${API}/habits`, user.token);
        promise.then(res => {
            const { data } = res;
            if (data.length !== 0) {
                if (user.habits.length === 0) setUser({ ...user, habits: data });
            }
            setHabits(data);
            console.log(user);
        })
    }, [user])

    function addHabitForm() {
        setDisplay({ name: "form" });
    }

    return (
        <PageContainer>
            <TopContainer className="title">
                <TitlePage>Meus Hábitos</TitlePage>
                <Button width={"40px"} height={"36px"} onClick={addHabitForm}>+</Button>
            </TopContainer>
            <Container>
                <HiddenForm display={display}>
                    <HabitForm user={user} setUser={setUser} setDisplay={setDisplay} />
                </HiddenForm>
                {habits.length ? habits.map(habit => <OneHabit {...habit} user={user} setUser={setUser} display={display} setDisplay={setDisplay} />)
                    : <span>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</span>}
            </Container>
        </PageContainer>
    );
}

const HiddenForm = styled.div`
    display: ${({ display }) => display ? "inherit" : "none"};
`;

const HabitContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const AlignLeft = styled.div`
    margin-top: 29px;
    display: flex;
    justify-content: end;
    align-items: center;
    color: #52B6FF;

    span{
        font-size: 16px;
        margin-right: 23px;
    }
`;

const Checkbox = styled.div`
    width: 30px;
    height: 30px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D4D4D4;
    border-radius: 5px;
    margin-right: 4px;
    margin-top: 8px;
    cursor: pointer;
    pointer-events: ${({ isDisable }) => isDisable ? "none" : "initial"};
    color: ${({ isCheck }) => isCheck ? "white" : "#DBDBDB"};
    background-color: ${({ isCheck }) => isCheck ? "#CFCFCF" : "white"};
`;

const TopContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`

const PageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
`;

const FormContainer = styled.form`
    font-size: 20px;
    width: 100%;
    padding: 18px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: white;
    display: flex;
    flex-direction: ${({ direction }) => direction};
`;

const DaysOptions = styled.div`
    display: flex;
`;

const DeleteModal = styled.div`
    position: fixed;
    width: 304px;
    height: 135px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    text-align: center;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.3));

    * {
        margin: 7px;
    }


`;