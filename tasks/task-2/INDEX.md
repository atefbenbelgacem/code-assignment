# Task 2

- Improve types.
This is answered in the code
- Make `UserListComponent` compatible with TypeScript strict mode and Angular strict templates.
This is answered in the code

- Can we improve performance in this example? If so, refactor `UserListComponent` to make it more performant.
Yes sure we can, as this component only displays some users, then if we are dealing with a large list of users we can implement eather "Lazy Loading" or "Virtual Scrolling" to load only parts of the users list which will improve performance.
However, since I have only the UserListComponent to work on I can implement other techniques like explicitly set the "change detection" strategy to "OnPush". Another technique is the trackBy function in order for Angular to track which item is modified in the list which can significantly improve performance during change detection.




P.S: Why importing the NgIf and NgFor, I don't think you need to explicitly import them 
