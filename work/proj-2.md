---
title: GeekOS
---

![Our OS](assets/img/work/proj-2/start.png)

I worked with peers to implement a simple command line operating system in C.
Our OS offers the user an interactive demonstration of how processes are managed, synchronized
and scheduled using the foundational concepts that we learned during an introduction to operating
systems course at the University of Windsor.
The project spanned one month and features contributions from

* Nik Steel
* Todd Baert
* Chris Zygowski
* and Aaron Sarson.

Our code is available on GitHub [here](https://github.com/NikSteel/GeekOS).

We selected [GeekOS](https://code.google.com/p/geekos/), an open source project by David H.
Hovemeyer, as our kernel and successfully implemented a command line interface, a five state
process model, scheduling queues, mechanisms for process synchronization and scheduling, and
dummy programs for demonstrating job submission scenarios.

In addition to contributing to the inner workings of the OS during whiteboard discussions
and pair programming activities, I lead development on the command line interface and
implemented a series of simple games to show how our scheduling and synchronization
algorithms work.

Here, two processes exchange control of a tic tac toe game using the Peterson solution to
the critical section problem:

![Peterson's solution demonstrated by tic tac toe game.](assets/img/work/proj-2/tictactoe.gif)

Here, a group of poem-writing processes attempt to write their poem into a shared memory location
at the same time. The late arriving processes are blocked by the earliest arriving one, which has
control of the mutex lock:

![Mutex locks demonstrated by poem writing competition.](assets/img/work/proj-2/poems.gif)

We provide four process scheduling algorithms and four job submission scenarios:

![Process scheduling menu.](assets/img/work/proj-2/scheduling.png)

The user can see how the processes transition between the five process states:

![Example of running the process scheduling demo.](assets/img/work/proj-2/scheduler.gif)

Afterwards, runtime statistics can be compared to evaluate the performance of each
scheduling algorithm given a particular job submission scenario.

![Runtime statistics](assets/img/work/proj-2/runtime_stats.png)
