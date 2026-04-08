---
title: Section 1: Coupling
---
In software engineering, coupling is a description of the extent to which disparate software modules depend on one another. Coupling is described as tight, high, or strong when modules are entirely dependent or mostly dependent on one another and loose, low, or weak when modules have few dependencies between them.

As a concrete example, consider the following pseudocode class stub:


This class is composed of many subparts, which are stored as references in the class’s member dictionary parts{}. In the constructor for the Car class, it creates an instance of the Engine class and places it in its parts{} dictionary, as every car needs an engine. In this implementation, the Engine is entirely reliant on the Car to exist and therefore tightly coupled. Now whenever the Engine class is altered, its connection with the Car class needs to be tested and preserved.