const PersonForm = ({ newName, handleChangeName, newNumber, handleChangeNumber, addPerson }) => {
    return <div>
        <form>
            <div>name: <input value={newName} onChange={handleChangeName} /></div>
            <div>number: <input type='tel' value={newNumber} onChange={handleChangeNumber} /></div>
            <div><button type="submit" onClick={addPerson}>add</button></div>
        </form>
    </div>
}

export default PersonForm