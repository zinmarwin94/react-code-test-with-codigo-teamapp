export const saveState = (state) => {
    try{
        const serializedState = JSON.stringify(state);        
        localStorage.setItem('team', serializedState);
    }catch (err) {
        // Ignored wirte err
        console.log("Setting in Local Storage Failed")
    }
}