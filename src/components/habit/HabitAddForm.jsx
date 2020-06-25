import React  from "react";
import Button from "../uiElements/Button";
import Input from "../uiElements/Input";
import './HabitAddForm.css'
const HabitAddForm = () => {
    return(
        <form className='HabitAddForm'>
            <input type="text" className='HabitAddForm-input' placeholder='Add your habit'/>
            <Button className='HabitAddForm-submit-btn'>Add Habit</Button>
        </form>
    )
}

export default HabitAddForm;