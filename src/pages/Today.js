import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import API from "../API";
import dayjs  from 'dayjs';  // load on demand
import { useUserContext } from "../contexts/UserContext";
import { useProgressContext } from "../contexts/ProgressContext";
import checkIcon from "../assets/imgs/check-icon.svg"
import TitlePage from "../components/styles/TitlePage";

function Progress({ hasProgress }) {
    const text = "% dos hábitos concluídos";
    return (
        <>
            {hasProgress && <Span>{hasProgress}{text}</Span>}
        </>
    );
}

function TodayHabit({ user, habit, habits, set }) {
    const { id, name, done, currentSequence, highestSequence } = habit;
    
    function habitHandler(e) {
        const promise = done ? axios.post(`${API}/habits/${id}/uncheck`, id, user.token) : axios.post(`${API}/habits/${id}/check`, id, user.token);
        promise.then(res => {
            console.log(done);
            const newHabits = habits.map(habit => {
                if (id == habit.id) {
                    habit["done"] = !done; 
                    return habit;
                } else {
                    return habit;
                }
            });
            set(newHabits);
        })
    }
    return (
        <Container direction={"row"}>
            <Container direction={"column"}>
                <span>{name}</span>
                <span>Sequência {currentSequence}</span>
                <span>recorde {highestSequence}</span>
            </Container>
            <CheckButton onClick={habitHandler} isCheck={done}>
                <img src={checkIcon} alt={"check icon"}/>
            </CheckButton>
        </Container>
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
                return "Nenhum hábito concluído ainda"
            }
            
        }
        return "Você não tem nenhum hábito ainda"
    };

    const doneHabits = printHabitDone();
    const weekdays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    return (
        <Container direction={"column"}>
            <TitlePage>{weekdays.find((item, index) => index === dayjs().day())}, {dayjs().format('DD/MM')}</TitlePage>
            {doneHabits}
            {todayHabits.length !== 0 && todayHabits.map(habit => <TodayHabit user={user} habit={habit} habits={todayHabits} set={setTodayHabits} />)}
        </Container>
    );
}

const Span = styled.span`
    color: green;
`;

const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.direction};
`;

const CheckButton = styled.div`
    width: 69px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${({isCheck}) => isCheck ? "#8FC549" : "#EBEBEB"};
`;