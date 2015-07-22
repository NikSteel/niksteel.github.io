---
title: GeekOS
---

![Our OS](assets/img/work/proj-2/start.png)

As a final project for an introduction to operating systems course at the 
University of Windsor, I collaborated with peers to implement a simple command line 
operating system for the purpose of demonstrating process management fundamentals. 
The project spanned two weeks and features contributions from

* Nik Steel
* Todd Baert
* Chris Zygowski
* and Aaron Sarson.

Our code is available on GitHub [here](https://github.com/NikSteel/GeekOS).

We selected GeekOS, an open source project by David H. Hovemeyer, as our kernel and 
successfully implemented a command line interface, a five state process model, 
scheduling queues, mechanisms for process synchronization and scheduling, and dummy 
programs for demonstrating job submission scenarios. 

In addition to contributing to the inner workings of the OS during whiteboard discussions 
and pair programming activities, I implemented a series of simple games and command line 
interfaces to offer the user an interactive understanding of how our OS works.

Here, two processes exchange control of a tic tac toe game using the Peterson solution to 
the critical section problem:

![Peterson's solution demonstrated by tic tac toe game.](assets/img/work/proj-2/tictactoe.gif)

Here, a group of poem-writing processes attempt to write their poem into a shared memory location at the same time. 
The late arriving processes are blocked by the earliest arriving one, which has 
control of the mutex lock:

![Mutex locks demonstrated by poem writing competition.](assets/img/work/proj-2/poems.gif)

We provide four process scheduling algorithms and four job submission scenarios:

![Process scheduling menu.](assets/img/work/proj-2/scheduling.png)

The user can see how the processes transition between the five process states,
and runtime statistics can be compared to evaluate the performance of each
scheduling algorithm given a particular job submission scenario.

![Runtime statistics](assets/img/work/proj-2/runtime_stats.png)
