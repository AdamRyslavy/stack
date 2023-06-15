import { Action, Location } from "history"
import { isEqual, isObject } from "lodash"
import memoizeOne from "memoize-one"

enum Actions {
    PUSH = "PUSH",
    REPLACE = "REPLACE",
    POP = "POP",
    INITIAL = "INITIAL"
}

type Stack = {
    pastEntries: Location[]
    futureEntries: Location[]
    currentEntry: Location
    action: Actions
}

const SESSION_STORAGE_STACK_KEY = "historyStack"
const REFERRER_KEY = "referrer"

const initialStack: Stack = {
    pastEntries: [],
    futureEntries: [],
    currentEntry: {} as Location,
    action: Actions.INITIAL
}

const memoizePastEntries = memoizeOne((stack: Stack) => stack.pastEntries, isEqual)
const memoizeFutureEntries = memoizeOne((stack: Stack) => stack.futureEntries, isEqual)
const memoizeCurrentEntry = memoizeOne((stack: Stack) => stack.currentEntry, isEqual)

const getStack = (): Stack => {
    try{
        const stack = sessionStorage.getItem(SESSION_STORAGE_STACK_KEY)
        return stack ? JSON.parse(stack) : initialStack
    }catch{
        console.log("no stack found")
    }

    return initialStack
}

const getPastEntries = () =>{
    const stack = getStack()
    return memoizePastEntries(stack)
}

const getFutureEntries = () =>{
    const stack = getStack()
    return memoizeFutureEntries(stack)
}
const getCurrentEntry = () =>{
    const stack = getStack()
    return memoizeCurrentEntry(stack)
}


type AnyParams = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

const isLocationState = (state: unknown): state is AnyParams =>{
    return isObject(state)
}

const getStoredReferrer = () =>{
    try{
        const referrer = sessionStorage.getItem(REFERRER_KEY)
        return referrer
    }catch{
        console.log("no referrer found")
    }
}

const init = (initialLocation: Location) =>{
    const state = initialLocation.state
    const referrer = document.referrer || "[empty]"
    const storedReferrer = getStoredReferrer()
    const {action} = getStack()


    if(isLocationState(state) && state.isRefresh){
        handlePopOrRefresh(initialLocation)
        return
    }

    if(storedReferrer !== referrer){
        const newStack: Stack = {
            pastEntries: [],
            futureEntries: [],
            currentEntry: initialLocation,
            action: Actions.INITIAL
        }
        sessionStorage.setItem(SESSION_STORAGE_STACK_KEY, JSON.stringify(newStack))
        sessionStorage.setItem(REFERRER_KEY, referrer)
        return
    }

    const newStack: Stack = {
        pastEntries: [...getPastEntries(), getCurrentEntry()],
        futureEntries: [],
        currentEntry: initialLocation,
        action
    }
    sessionStorage.setItem(SESSION_STORAGE_STACK_KEY, JSON.stringify(newStack))
}

const handlePush = (location: Location) =>{
    const stack = getStack()

    const currentEntry = getCurrentEntry()

    const newStack: Stack = {
        ...stack,
        pastEntries: [...getPastEntries(), currentEntry],
        currentEntry: location,
        action: Actions.PUSH
    }

    sessionStorage.setItem(SESSION_STORAGE_STACK_KEY, JSON.stringify(newStack))
}

const handleReplace = (location: Location) =>{

    const newStack: Stack = {
        currentEntry: location,
        pastEntries: getPastEntries(),
        futureEntries: getFutureEntries(),
        action: Actions.REPLACE
    }
    sessionStorage.setItem(SESSION_STORAGE_STACK_KEY, JSON.stringify(newStack))
}


const handlePopOrRefresh = (location: Location) => {
    const pastRoute = getPastEntries().find((path) =>{
        return path.key === location.key
    })
    const futureRoute = getFutureEntries().find((path) =>{
        return path.key === location.key
    })

    const isGoBack = !!pastRoute
    const isGoFuture = !!futureRoute
    
    if(isGoBack){
    const newStack: Stack = {
        currentEntry: pastRoute,
        futureEntries: [...getFutureEntries(), getCurrentEntry()],
        pastEntries: getPastEntries().filter(path => !isEqual(path, pastRoute)),
        action: Actions.POP
    }
    return sessionStorage.setItem(SESSION_STORAGE_STACK_KEY, JSON.stringify(newStack))
}

if(isGoFuture){
    const newStack: Stack = {
        currentEntry: futureRoute,
        futureEntries: getFutureEntries().filter(path => !isEqual(path, futureRoute)),
        pastEntries: [...getPastEntries(), getCurrentEntry()],
        action: Actions.POP
    }
    return sessionStorage.setItem(SESSION_STORAGE_STACK_KEY, JSON.stringify(newStack))
}
}

const handleChange = (location: Location, action: Action) => {
    switch (action) {
        case Actions.POP:
            handlePopOrRefresh(location)
            break
        case Actions.PUSH:
            handlePush(location)
            break
        case Actions.REPLACE:
            handleReplace(location)

    }
}

export const historyStack = {
    init,
    handleChange,
    getPastEntries,
    getFutureEntries,
    getCurrentEntry
}