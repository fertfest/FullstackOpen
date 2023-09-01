import Part from "./Part";

const Content = ({ parts }) => {
    return <>
        {parts.map((part) =>
            <Part key={part.id} name={part.name} number={part.exercises} />
        )}
        <p><b>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</b></p>
    </>
}

export default Content