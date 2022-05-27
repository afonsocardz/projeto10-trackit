import axios from "axios";
import styled from "styled-components";
import { useEffect, useState } from "react";
import API from "../API";
import { useUserContext } from "../contexts/UserContext";

function DayInput({ day, index, handler }) {

    return (
        <Checkbox day={day.letter} id={index} type={"checkbox"} value={day.check} onChange={e => handler(e)} />
    );
}

const Checkbox = styled.input`
    ::after{
        content: '${props => props.day}';
    }
`;

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

export default function Today() {
    const { user, setUser } = useUserContext();
    const [days, setDays] = useState(daysObj);
    const [habitName, setHabitName] = useState("");

    console.log(user);

    const config = {
        headers: {
            "Authorization": `Bearer ${user.token}`
        }
    }

    useEffect(() => {
        const promise = axios.get(`${API}/habits`, config)
        promise.then(res => {
            const { data } = res;
            localStorage.setItem("habits", data)
            
        }).catch(err => {
            console.log(err);
        });
    }, [user]);

    function addHabit(name, days) {
        const body = {
            name,
            days, // segunda, quarta e sexta
        }
        const promise = axios.post(`${API}/habits`, body, config);

        promise.then(res => {
            const { data } = res;
            console.log(data);
            setUser({...user, habits: data});
        }).catch(err => {
            console.log(err);
        })
    }

    function checkHandler(e) {
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        console.log(value);
        const id = target.id;
        const checkDay = days.map( ({id:userId, letter, check }) => userId == id ? {id:userId, letter:letter, check: value} : {id:userId, letter:letter, check:check});
        setDays(checkDay);
    }

    function submitHandler(e){
        e.preventDefault();
        const checkedDays = days.filter(({check}) => check === true);
        addHabit(habitName,checkedDays.map(day => day.id));
        
    }

    console.log(days);

    return (
        <form onSubmit={submitHandler}>
            <input value={habitName} onChange={(e) => setHabitName(e.target.value)}/>
            {days.map((day,index) => <DayInput day={day} index={index} handler={checkHandler} /> )}
            <button>enviar</button>
        </form>
    );
}