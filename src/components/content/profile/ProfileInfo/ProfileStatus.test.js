import ProfileStatus from "./ProfileStatus";


describe("Profile STATUS TEST", () =>{
    test("status from props should be in the state",()=>{
        const component = create(<ProfileStatus status="ITS ME HELLO"/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe("ITS ME HELLO")
    })
})

// ШЛАК НЕПОНЯТНО КАК ИСПОЛЬЗОВАТЬ