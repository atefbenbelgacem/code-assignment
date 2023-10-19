# Task 1

- How many times will the API call to fetch jobs be triggered here?
response : two times, one when the data property of the service is called in the data property of the component (instantiation of the service), the second because of the async pipe used in the template.

- What are the possible ways to prevent multiple API calls?
response:
1.A very simple method is to modify the template and the component using ngIf and another attribute called "isDataPresent" for exapmle and only load the data when no data is already there.
2.A second method is to modify the service (which I like more) and cache the data in another property and return the cached data not the API call.
3.A third method is olso to modify the service and to remove the readonly flag from data$ then using another boolean flag check if the data is already requested.

- Refactor this example to prevent multiple API calls.
I'll implement the second one.





P.S: Why importing the NgIf and NgFor, I don't think you need to explicitly import them
