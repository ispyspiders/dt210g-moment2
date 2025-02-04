import { useState } from 'react';
import './TodoForm.css' // importera CSS
import * as Yup from "yup";
import { CaretUp, CaretDown } from '@phosphor-icons/react';

const TodoForm = () => {

    //Interface
    interface FormData {
        title: string,
        description: string
    }

    interface ErrorsData {
        title?: string,
        description?: string
    }

    // States
    const [formData, setFormData] = useState<FormData>({ title: "", description: "" });
    const [errors, setErrors] = useState<ErrorsData>({});
    const [showForm, setShowForm] = useState(false);

    // Valideringsschema
    const validationSchema = Yup.object({
        title: Yup.string().required("Vänligen ange en titel").min(4, "Titel måste innehålla minst 4 tecken"),
        description: Yup.string().notRequired().max(200, "Beskrivning får max innehålla 200 tecken")
    })

    // Metoder
    // Skicka formulär/skapa todo
    const submitForm = async (event: any) => {
        event.preventDefault();

        try {
            await validationSchema.validate(formData, { abortEarly: false })
            
            // Anropa webbtjänst
            console.log("Todo tillagd", formData);



            
            setErrors({}); //nollställ felmeddelanden
        } catch (errors) {
            const validationErrors: ErrorsData = {};
            if (errors instanceof Yup.ValidationError) {
                errors.inner.forEach(error => {
                    const prop = error.path as keyof ErrorsData;
                    validationErrors[prop] = error.message;
                })
                setErrors(validationErrors);
            }
        }

    }

    // toggla formulärets synlighet
    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    }

    return (
        <div className='formContainer'>
            <div onClick={toggleFormVisibility} id='toggleForm' className={showForm ? 'visible' : ''}>
                <h3>Lägg till att göra</h3>
                {!showForm &&
                    <CaretUp size={20} />
                }
                {showForm &&
                    <CaretDown size={20} />
                }
            </div>

            {showForm &&
                <form onSubmit={submitForm}>
                    <label htmlFor="title">Titel</label>
                    <input type="text" name='title' id='title' value={formData.title}
                        onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                    />
                    {errors.title && <span className='error'>{errors.title}</span>}

                    <label htmlFor="description">Beskrivning</label>
                    <textarea name="description" id="description" rows="4" value={formData.description}
                        onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                    ></textarea>
                    {errors.description && <span className='error'>{errors.description}</span>}

                    <input type="submit" value="Lägg till +" />
                </form>
            }

        </div>
    )
}

export default TodoForm