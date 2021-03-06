---
title: Fruitbots
---

![Fruitbots workshop at the Canadian Youth Chess Championship](assets/img/work/proj-1/cycc.jpg)

Fruitbots is a game by Mathias Kramm in which two robots compete to collect more fruit in more categories
than their opponent.
During a workshop hosted by Hackforge for kids attending the 2015 Canadian Youth Chess Championship,
I helped a group of kids plan a bot strategy and translated their ideas into working JavaScript code.
Our bot competed against the bots created by other teams (who were assisted by other Hackforge volunteers),
and I'm proud to say that our bot, the Math-o-matic, won in several rounds!

After the workshop, I made a small API of helper functions to make the task of writing simple bots for workshops
like this easier.  I also noticed a bug in Hackforge's fruitbot game that caused two of its functions to return the
wrong result -- potentially influencing the result of our tournament -- and I submitted a bug fix on GitHub.

You can view my fruitHelp API on GitHub [here](https://github.com/NikSteel/robot-fruit-hunt), which expands upon
Hackforge's repo.

Here are two bots that I made as examples that use the fruitHelp API:

<div class="fruitbots" >
   <iframe src="fruitbots/index.html"></iframe>
   <img alt="Fruitbots game" src="assets/img/work/proj-1/fruitvid.gif">
</div>

The evadeBot attempts to detect which fruit its opponent might be targeting and avoids targeting the same fruit
if its opponent can arrive sooner. The evade bot also considers the value of the fruit.
The nearBot targets the nearest fruit that can benefit its score.
 