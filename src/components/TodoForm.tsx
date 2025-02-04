import { useState } from 'react';
import './TodoForm.css' // importera CSS
import * as Yup from "yup";
import { CaretUp, CaretDown } from '@phosphor-icons/react';
import { Todo } from '../interfaces/TodoInterface'

//Interface
interface FormData {
    title: string,
    description: string | null,
    status: 'ej påbörjad' | 'pågående' | 'avklarad'
}

interface ErrorsData {
    title?: string,
    description?: string,
    other?: string
}

interface TodoFormProps {
    addTodo: (todo: Todo) => void;
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
    // States
    const [formData, setFormData] = useState<FormData>({ title: "", description: "", status: 'ej påbörjad' });
    const [errors, setErrors] = useState<ErrorsData>({});
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Valideringsschema
    const validationSchema = Yup.object({
        title: Yup.string().required("Vänligen ange en titel").min(4, "Titel måste innehålla minst 4 tecken"),
        description: Yup.string().nullable().max(200, "Beskrivning får max innehålla 200 tecken"),
        status: Yup.mixed().oneOf(['ej påbörjad', 'pågående', 'avklarad'], "Välj en giltig status")
    });

    // Metoder
    // API-anrop
    const sendToApi = async (todo: Todo) => {
        try {
            const body = {
                "title": todo.title,
                "description": todo.description
            };

            // Om beskrivning inte har innehåll / är null, sätt till undefined
            if (todo.description == null || todo.description.length <= 0) {
                body.description = undefined;
            }

            const response = await fetch("https://dt210g-todo.azurewebsites.net/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Något gick fel vid skapandet av Todo");
            }

            return response.json(); //returnera sparat todo från servern
        } catch (error) {
            console.error("Fel vid API-anrop: ", error);
            throw error;
        };
    }


    // Skicka formulär/skapa todo
    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true); // Vi börjar skicka formulär

        try {
            // Validera input
            await validationSchema.validate(formData, { abortEarly: false });

            // Anropa webbtjänst
            const savedTodo = await sendToApi(formData);

            // om lyckat, skicka Todo till föräldrakomponent för att lägga till i listan
            addTodo(savedTodo);

            setErrors({}); //nollställ felmeddelanden
            setFormData({ title: "", description: "", status: 'ej påbörjad' });  // Rensa formulärfält och sätt status till 'ej påbörjad'
        } catch (errors) {
            const validationErrors: ErrorsData = {};
            if (errors instanceof Yup.ValidationError) {
                errors.inner.forEach(error => {
                    const prop = error.path as keyof ErrorsData;
                    validationErrors[prop] = error.message;
                })
                setErrors(validationErrors);
            } else {
                setErrors({ other: "Något gick fel vid skapandet av att göra" })
            }
        } finally {
            setIsSubmitting(false); // Vi skickar inte längre
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
            
            {/* Visa/göm formulär vid tryck  */}
            {showForm &&
                <form onSubmit={submitForm}>
                    {errors.other && <span className='error'>{errors.other}</span>}

                    <label htmlFor="title">Titel</label>
                    <input type="text" name='title' id='title' value={formData.title}
                        onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                    />
                    {errors.title && <span className='error'>{errors.title}</span>}

                    <label htmlFor="description">Beskrivning</label>
                    <textarea name="description" id="description" rows={4} value={formData.description}
                        onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                    ></textarea>
                    {errors.description && <span className='error'>{errors.description}</span>}

                    {/* <input type="hidden" name="status" value="ej påbörjad" /> */}

                    <input type="submit" disabled={isSubmitting} value={isSubmitting ? "Skickar..." : "Lägg till +"} />
                </form>
            }

        </div>
    )
}

export default TodoForm