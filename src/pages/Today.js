import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import API from "../API";
import dayjs from 'dayjs';  // load on demand
import { useUserContext } from "../contexts/UserContext";
import { useProgressContext } from "../contexts/ProgressContext";
import checkIcon from "../assets/imgs/check-icon.svg"
import TitlePage from "../components/styles/TitlePage";

function Progress({ hasProgress }) {
    const text = "% dos hábitos concluídos";
    return (
        <>
            {hasProgress && <Span hasProgress={hasProgress}>{hasProgress}{text}</Span>}
        </>
    );
}

function TodayHabit({ user, habit, habits, setHabits }) {
    const { id, name, done, currentSequence, highestSequence } = habit;
    const [highest, setHighest] = useState(false);
    const [current, setCurrent] = useState(done);

    function habitHandler(e) {
        const promise = done ? axios.post(`${API}/habits/${id}/uncheck`, id, user.token) : axios.post(`${API}/habits/${id}/check`, id, user.token);
        promise.then(res => {
            console.log(habits);
            const newHabits = habits.map(habit => {
                if (id == habit.id) {
                    habit["done"] = !done;
                    if (!done === false) {
                        habit["currentSequence"] -= 1;
                        habit["highestSequence"] -= 1;
                        setHighest(false);
                        setCurrent(false);
                    } else {
                        console.log("aqui")
                        habit["currentSequence"] += 1;
                        setCurrent(true);
                    }
                    if (habit.highestSequence < habit.currentSequence) {
                        habit["highestSequence"] += 1;
                        setHighest(true);
                    }
                    return habit;
                } else {
                    return habit;
                }
            });
            setHabits(newHabits);
        })
    }
    return (
        <FormContainer direction={"row"} >
            <Container direction={"column"}>
                <HabitTitle>{name}</HabitTitle>
                <SequenceContainer>
                    <span>Sequência atual: <SequenceChanges isChange={current}>{currentSequence} dias</SequenceChanges></span>
                    <span>Seu recorde: <SequenceChanges isChange={highest}>{highestSequence} dias</SequenceChanges></span>
                </SequenceContainer>
            </Container>
            <CheckButton onClick={habitHandler} isCheck={done}>
                <img src={checkIcon} alt={"check icon"} />
            </CheckButton>
        </FormContainer>
    );
}


export default function Today() {
    const { user, setUser } = useUserContext();
    const { setProgress } = useProgressContext();
    const [todayHabits, setTodayHabits] = useState([]);

    useEffect(() => {
        const promise = axios.get(`${API}/habits/today`, user.token)
        promise.then(res => {
            const { data } = res;
            setTodayHabits(data);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    function printHabitDone() {
        if (todayHabits.length !== 0) {
            const doneHabits = todayHabits.filter(habit => habit.done);
            if (doneHabits.length !== 0) {
                const percentage = parseInt((doneHabits.length / todayHabits.length) * 100);
                console.log(percentage);
                setProgress(percentage);
                return <Progress hasProgress={percentage} />
            } else {
                setProgress(0);
                return <Span>Nenhum hábito concluído ainda</Span>
            }
        }
        setProgress(0);
        return <Span>Você não tem hábitos ainda</Span>
    };

    const doneHabits = printHabitDone();
    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    return (
        <>
            <TopContainer>
                <TitlePage>{weekdays.find((item, index) => index === dayjs().day())}, {dayjs().format('DD/MM')}</TitlePage>
                {doneHabits}
            </TopContainer>
            <Container direction={"column"}>
                {todayHabits.length !== 0 && todayHabits.map(habit => <TodayHabit user={user} habit={habit} habits={todayHabits} setHabits={setTodayHabits} />)}
            </Container>
        </>
    );
}

const HabitTitle = styled.div`
    margin-bottom: 7px;
`;

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: auto;
`;

const SequenceChanges = styled.span`
    color: ${({ isChange }) => isChange ? "#8FC549" : "#666666"};
`;

const SequenceContainer = styled.div`
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Span = styled.span`
    color: ${({ hasProgress }) => hasProgress ? "#8FC549" : "#bababa"};
    margin-bottom: 28px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
    color: #666666;
`;

const FormContainer = styled.form`
    font-size: 20px;
    width: 340px;
    padding: 18px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: white;
    display: flex;
    color: #666666;
    flex-direction: ${({ direction }) => direction};
`;

const CheckButton = styled.div`
    width: 69px;
    height: 69px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    cursor: pointer;
    background-color: ${({ isCheck }) => isCheck ? "#8FC549" : "#EBEBEB"};
`;