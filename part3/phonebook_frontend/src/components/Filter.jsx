const Filter = ({ searched, handleChangeSearched }) => {
    return <div>
        filter shown with<input value={searched} onChange={handleChangeSearched} />
    </div>
}

export default Filter