---
title: "Section 1: S.O.L.I.D."

description: "You should name a variable using the same care with which you name a first-born child. <br> -Robert C. Martin \"Clean Code\""
---

Introduced in the 2000 paper [Design Principles and Design Patterns](https://staff.cs.utu.fi/~jounsmed/doos_06/material/DesignPrinciplesAndPatterns.pdf) by software engineer and instructor Robert C. Martin, SOLID is a mnemonic for five principles meant to combat a phenomenon Martin termed “software rot." Martin describes this process as a slow degradation that tarnishes the initial elegant implementation with workarounds, hacks, and other blemishes. The result? “A festering mass of code that developers find increasingly hard to maintain.” The SOLID principles intend to help keep software from falling into this state of disrepair.

&emsp;S - Single Responsibility Principle: A Class should only ever have one reason to change
&emsp;O - Open/Closed Principle: A Class should be open for extension but closed for modification
&emsp;L - Liskov Substitution Principle: Functions that use pointers to base classes must be able to use references of derived classes without knowing it  
&emsp;I - Interface Segregation Principle: Classes should not be forced to depend on interfaces they do not use
&emsp;D - Dependency Inversion Principle: Classes should depend on abstract classes and functions rather than concrete implementations

### Check In:

#### Which of these scenarios violates Martin's single responsibiltiy principle?

<form id="survey_q2">
    <input type="radio" name="q2" required/>
        <label>A <span style="font-family: 'Courier New', monospace;">UserServices</span> class encapsulates logic for validating user credentials, persisting user data to the connected database, and notifying users when their account details change.
        </label><br>
    <input type="radio" name="q2" required/>
        <label>An <span style="font-family: 'Courier New', monospace;">EODReportGenerator</span> class creates an end-of-day report for an online marketplace. It contains methods that generate this report as PDF, CSV, or HTML documents using the same underlying data model.
    <input type="radio" name="q2" required/>
        <label>A <span style="font-family: 'Courier New', monospace;">PaymentProcessor</span> class contains a reference to a <span style="font-family: 'Courier New', monospace;">PaymentGateway</span> interface, allowing different gateway implementations at runtime.</label><br>
    <input type="radio" name="q2" required/>
        <label>An <span style="font-family: 'Courier New', monospace;">Order</span> class encapsulates order data. It includes a method, <span style="font-family: 'Courier New', monospace;">calcTotal(),</span> that computes the order total based on line item, taxes, and discounts</label><br>
    <input type="range" name="q2_conf" min="1" max="10" required> How confident are you in your answer?
<form>