This code set had a great base with quite a few interesting problems to fix.

As a more front-end focused developer, I immediately cleaned up the layout and page. Removing some of the 
excess information and improving readability made the page easier to work with.
This also led to some discoveries of what could be improved in the functionality of the app.

Afterward, I set up the db and recognized that all of the data is pulled in one call.
I updated this to add pagination. I only pulled 5 at a time to work with the given data set, which only had 15 rows.
I didn't have time to finalize the UI for this.

I realize that this change means the search functionality only searches the given page, instead of the full data set.
given more time, I would update the search to execute on the database and pull the relevant rows.
This is an expensive operation to perform on every keystroke, so optimizing this would mean, assuming a large enough data
set (maybe 100k rows) waiting for a submission from the user before querying.

thank you for this challenge and this opportunity! I learned a lot as well.