function Data() {
    function handlePick(){
        alert("test");
    }

    return (
        <div>
            <input type="button" onClick={handlePick} value="What you want to do ?" />
        </div>
    )
}

export default Data;