import axios from "axios";
import { useEffect, useState } from "react";
import API from "../API";
import { useUserContext } from "../contexts/UserContext";
import styled from "styled-components";
import Button from "../components/styles/Button";
import TitlePage from "../components/styles/TitlePage";
import Input from "../components/styles/Input";
import Container from "../components/styles/Container";

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

function DayInput({ day, index, handler }) {
    return (
        <Checkbox day={day.letter} id={index} type={"checkbox"} value={day.check} onChange={e => handler(e)} />
    );
}

function HabitForm({ user, setUser, setDisplay }) {
    const [habitName, setHabitName] = useState("");
    const [days, setDays] = useState(daysObj);

    function addHabit(name, days) {
        const body = {
            name,
            days, // segunda, quarta e sexta
        }
        const promise = axios.post(`${API}/habits`, body, user.token);

        promise.then(res => {
            const { data } = res;
            setUser({ ...user, habits: user.habits, data });
            setDisplay(false);
        }).catch(err => {
            console.log(err);
        })
    }

    function checkHandler(e) {
        const target = e.target;
        const value = target.checked;
        const id = target.id;
        const checkDay = days.map(({ id: userId, letter, check }) => userId == id ? { id: userId, letter: letter, check: value } : { id: userId, letter: letter, check: check });
        setDays(checkDay);
    }

    function submitHandler(e) {
        e.preventDefault();
        const checkedDays = days.filter(({ check }) => check === true);
        addHabit(habitName, checkedDays.map(day => day.id));
    }

    return (
        <Container>
            <FormContainer onSubmit={submitHandler}>
                <Input value={habitName} onChange={(e) => setHabitName(e.target.value)} />
                <DaysOptions>
                    {days.map((day, index) => <DayInput day={day} index={index} handler={checkHandler} />)}
                </DaysOptions>
                <Button width={"84px"} height={"35px"}>Salvar</Button>
            </FormContainer>
        </Container>
    );
}

export default function Habits() {
    const { user, setUser } = useUserContext();
    const [habits, setHabits] = useState(null);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        const promise = axios.get(`${API}/habits`, user.token);
        promise.then(res => {
            const { data } = res;
            setHabits(data);
        })
    }, [])

    function addHabitForm() {
        setDisplay(true);
    }

    function printHabits() {


    }
    return (
        <PageContainer>
            <TopContainer className="title">
                <TitlePage>Meus Hábitos</TitlePage>
                <Button width={"40px"} height={"36px"} onClick={addHabitForm}>+</Button>
            </TopContainer>
            {display && <HabitForm user={user} setUser={setUser} setDisplay={setDisplay} />}
        </PageContainer>
    );
}

const Checkbox = styled.input`
    width: 30px;
    height: 30px;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D4D4D4;
    :before{
        
        color: #DBDBDB;
        content: '${props => props.day}';
    }
    :after{

    }

    :not(:checked),:checked{
        color: white;
        background-color:#CFCFCF;
    }
`;

const TopContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const PageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: start;
    flex-direction: column;
`;

const FormContainer = styled.form`
    padding: 18px;
    background-color: white;
    display: flex;
    flex-direction: column;
`;

const DaysOptions = styled.div`
    display: flex;
`;