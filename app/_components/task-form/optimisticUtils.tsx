// OptimisticFn
// takes current state e.g., list of items that are already fetched on the page
// takes optimistic value e.g., the new item to be added to the item list (data from form)
// returns optimistic state -> a new item list with optimistic value added
//
// useOptimistic takes initial state e.g., list of already fetched items
// and OptimisticFn
// return optimisticState which is equal initial state if no action is pending, which is then the state returned by OptimisticFn
// and addOptimisc is dispatching function used when u want to do optimistic update
// it takes optimisticValue and call OptimisticFn with initial state and optimisticValue
