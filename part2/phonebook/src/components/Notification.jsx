const Notification = ({ message, isError }) => {
    const styleDiv = {
        color: isError ? "red" : "green",
        backgroundColor: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
    }

    return message === null ?
        null : <div style={styleDiv}>
            {message}
        </div>
}

export default Notification