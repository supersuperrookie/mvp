import { Status } from "./constants"
export const actions = {
    setAccount: (store, value) => {
        store.setState({ account: value })
    },
    setDID: (store, value) => {
        store.setState({ did: value })
    }
    // ownedSetStatusPendingInit: (store, value) => {
    //     let orders = store.state.ownedDummyData
    //     orders.filter(({id}) => id === value).forEach(item => {item.status = Status.PENDING_INIT})
    //     store.setState({ownedDummyData: orders});
    // },
    // ownedSetStatusPendingMate: (store, value) => {
    //     let orders = [...store.state.ownedDummyData]
    //     orders.filter(({id}) => id === value).forEach(item => {item.status = Status.PENDING_MATE})
    //     store.setState({ownedDummyData: orders});
    // },
    // ownedSetStatusPending: (store, value) => {
    //     let ownedDummyData = store.state.ownedDummyData
    //     orders.filter(({id}) => id === value).forEach(item => {item.status = Status.PENDING})
    //     store.setState({ownedDummyData});
    // },
}