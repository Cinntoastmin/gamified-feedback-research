---
title: "Section 2: S.O.L.I.D."

description: "You should name a variable using the same care with which you name a first-born child. <br> -Robert C. Martin \"Clean Code\""
---

Introduced in the 2000 paper [Design Principles and Design Patterns](https://staff.cs.utu.fi/~jounsmed/doos_06/material/DesignPrinciplesAndPatterns.pdf) by software engineer and instructor Robert C. Martin, SOLID is a mnemonic for five principles meant to combat a phenomenon Martin termed “software rot." Martin describes this process as a slow degradation that tarnishes the initial elegant implementation with workarounds, hacks, and other blemishes. The result? “A festering mass of code that developers find increasingly hard to maintain.” The SOLID principles intend to help keep software from falling into this state of disrepair.

- S - Single Responsibility Principle: A Class should only ever have one reason to change.
- O - Open/Closed Principle: A Class should be open for extension but closed for modification.
- L - Liskov Substitution Principle: Functions that use pointers to base classes must be able to use references of derived classes without knowing it.
- I - Interface Segregation Principle: Classes should not be forced to depend on interfaces they do not use.
- D - Dependency Inversion Principle: Classes should depend on abstract classes and functions rather than concrete implementations.

### Check In:

#### Which of these scenarios violates Martin's single responsibiltiy principle?

<div id="survey-root" data-page="2">
    <form id="survey-form">
        <input type="radio" name="answer" value="A" required/>
            <label>A <span style="font-family: 'Courier New', monospace;">UserServices</span> class encapsulates logic for validating user credentials, persisting user data to the connected database, and notifying users when their account details change.
            </label><br><br>
        <input type="radio" name="answer" value="B" required/>
            <label>An <span style="font-family: 'Courier New', monospace;">EODReportGenerator</span> class creates an end-of-day report for an online marketplace. It contains methods that generate this report as PDF, CSV, or HTML documents using the same underlying data model.</label><br><br>
        <input type="radio" name="answer" value="C" required/>
            <label>A <span style="font-family: 'Courier New', monospace;">PaymentProcessor</span> class contains a reference to a <span style="font-family: 'Courier New', monospace;">PaymentGateway</span> interface, allowing different gateway implementations at runtime.</label><br><br>
        <input type="radio" name="answer" value="D" required/>
            <label>An <span style="font-family: 'Courier New', monospace;">Order</span> class encapsulates order data. It includes a method, <span style="font-family: 'Courier New', monospace;">calcTotal(),</span> that computes the order total based on line item, taxes, and discounts</label><br><br><br>
        <div class="range-container">
            <span>0</span>
            <input type="range" name="confidence" min="1" max="10" required> 
            <span>10</span>
            <label>How confident are you in your answer?</label>
        </div>
        <button type="submit">Submit</button>
    </form>
    <div id="experimental-feedback" hidden></div>
</div>

<script type="module">
    import "{{ site.baseurl }}/assets/js/main.js";
</script>