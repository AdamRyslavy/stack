import { History, createBrowserHistory } from "history";






export function createHistory(): History {
    const history = createBrowserHistory()


    const handlePush = (location: Location) => {
        history.push(location)
    }

    const handleReplace = (location: Location) => {
        history.replace(location)

    }

    const proxy = new Proxy(history, {
        get(target, prop, receiver) {
            if (prop === "push") {
                return handlePush
            }

            if (prop === "replace") {
                return handleReplace
            }

            return Reflect.get(target, prop, receiver)
        }
    })


    return proxy

}