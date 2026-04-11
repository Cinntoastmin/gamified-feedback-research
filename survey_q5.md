---
title: "Section 5: Dependency Injection Testing Implications"

description: “Beware of bugs in the above code; I have only proved it correct, not tried it.” - Donald E. Knuth
---

Another of dependency injection's major benefits is the ease with which it allows for unit testing of software modules. Now that a module expects only an abstraction, developers can, when writing a unit test of a given module, pass in a dummy implementation of the abstraction for their tests. This allows tests to be run on a constant set of conditions and keeps tests from altering production data.

Take, for example, an application that relies on a database to store its data. Writing unit tests for software like this can be complicated, as the developer needs to ensure that whatever data the tests create must be deleted to preserve the integrity of the production environment. Implementing dependency injection when connecting your application to the database allows the unit test to run on any data set that adheres to the specified abstraction.

### Check In:

#### What makes dependency injection advantageous when it comes to unit testing code that interfaces with live services, such as a database?

<div id="survey-root" data-page="5">
    <form id="survey-form">
        <input type="radio" name="answer" value="A" required/>
            <label>Dependency injection ensures a valid connection with a service when testing.</label><br><br>
        <input type="radio" name="answer" value="B" required/>
            <label>Dependency injection allows for the substitution of a mock service for the live one, allowing the developer to test in a controllable environment.</label><br><br>
        <input type="radio" name="answer" value="C" required/>
            <label>Dependency injection speeds up testing by using only cached query results</label><br><br>
        <input type="radio" name="answer" value="D" required/>
            <label>Dependency injection automatically reverts changes made to data in a live database</label><br><br><br>
        <div class="range-container">
            <span>0</span>
            <input type="range" name="confidence" min="1" max="10" required> 
            <span>10</span>
            <label>How confident are you in your answer?</label>
        </div>
        <button type="submit">Submit</button>
    <form>
</div>

<script type="module">
    import "{{ site.baseurl }}/assets/js/main.js";
</script>