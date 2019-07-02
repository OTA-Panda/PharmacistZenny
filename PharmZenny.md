<link href="https://torto21.github.io/PharmacistZenny/PharmZenny.css" rel="stylesheet"></link>
<!-- <link href="PharmZenny.css" rel="stylesheet"></link> -->

# **Pharmacist Zenny**

Growing up, Dr. Mario was one of my favorite games.  I often joked with my sister that it would be funny to replace Mario with my mom and have her throw the pills. Et Voilà.

## <orange>**Game Overview**</orange>

- #### <green>**The player is presented with a 2-dimensional field (the bottle):**</green>

  - 8 spaces wide
  - 16 spaces high
  - Has an opening (spout) 2 space wide, centered at the top

- #### <green>**Pharmacist Zenny tosses pills into the bottle, 1 at a time**</green>

  - Pill are 1 x 2 spaces
  - Pills have **colors**, that can be either 
  <red>**red**</red>, 
  <yellow>**yellow**</yellow>, or 
  <blue>**blue**</blue>
  - A pill can be entirely *one* color **or** be a *combination* of 2 colors, with a total of 6 combinations:
    - <red>**red**</red> :
      <red>**red**</red>, 
    - <red>**red**</red> :
      <yellow>**yellow**</yellow>, 
    - <red>**red**</red> :
      <blue>**blue**</blue>, 
    - <yellow>**yellow**</yellow> :
      <yellow>**yellow**</yellow>,
    - <yellow>**yellow**</yellow> :
      <blue>**blue**</blue>, 
    - <blue>**blue**<blue> :
      <blue>**blue**</blue>
  - A tossed in pill will start at the spout and and fall at a regular rate (e.g. 1 space / 1 seconds)
    - This rate will **increase** as the player completes levels
  - While a pill is falling, the player can:
    - **Move** it *left* or *right* within the limits of the bottle
    - **Rotate** it *clockwise* or *counter-clockwise*
    - **Orient** it to be *"vertical"* or *"horizontal"*
    - (Note: pills *cannot* be moved "up")
  - A pill will eventually land and is then locked in both position and orientation for the remainder of a level or until removed
  - A Pill can be **accellerated** to a faster drop rate or can be **instantly dropped** onto it's current vertical alignment
  - Once a pill lands, a new pill with a different color combination is tossed into the bottle
  - Pills are necessary to remove **"Diseases"** 


- #### <green>**The bottle is filled with creatures (Diseases) to remove**</green>

  - Diseases are 1 x 1 spaces
  - Each disease has an arbitrary color: 
  <red>**red**</red>, 
  <yellow>**yellow**</yellow>, or 
  <blue>**blue**</blue>
  - The number of diseases in a bottle starts off small (e.g. 4) and increases with each subsequent level
  - Diseases are randomly placed within the bottle, not to exceed a specified "Vertical Limit" (e.g. row 5)
    - The vertical limit increases as levels are completed (max: row 12)
  - Diseases are static in position within the bottle (i.e. they do not fall)

## <orange>**Game Mechanics**</orange>

- #### <span style="color:mediumpurple">**Play Condition**</span>

  - The player assists **Pharmacist Zenny** by removing all diseases from the bottle.
  
  - As pills land and create structures such as "Stacks" or "Stairs" inside the bottle, various patterns of adjacent colors can occur.
  
  - If 4 or more spaces of the same color are adjacent and in a line that is either vertical or horizontal (a "Group Line"), then that group line will be removed from the bottle ("Medicated").
  
  - By stacking pills or parts of pills next to a disease of the same color, the player can incorporate the disease into a group line and **medicate** it, thus removing the diseease from the bottle.
  
  - A **Gravity** exists which affects all pills at all times, causing any pills (whole or in part) to fall vertically down if nothing is "holding" them up (e. g. "steps" of horizontal pills)
  
  - Becauses diseases are static within the bottle, gravity does not cause them to fall, but diseases can prevent pills from falling
  
  - When any group line is medicated, the absence it creates will cause anything not currently held up to fall.  Somtimes when these structures fall, a **"Chain"** occurs.
  
  - **Chaining** is when a new group line forms after a previous group line is medicated.  A chain will continue until no new group line is created.
  
  - When all the diseases from a bottle are removed via medication, the level is complete and a new bottle with a higher difficulty is given to the player.  This repeats until the game is over.

- #### <span style="color:mediumpurple">**Difficulty**</span>

  - Difficulty increases as the levels progress.
  - Difficulty increases by:
    - Increasing the speed at which pills fall
    - Increasing the number of diseases
    - Increasing the vertical limit for which diseases can appear within the bottle

- #### <span style="color:mediumpurple">**Game Over Condition**</span>

  - The game ends when Pharmacist Zenny tosses a pill into the spout of the bottle and it cannot fall inside because it is "clogged."
  - Clogging usually occurs because:
    - A disease near the spout isn't medicated properly and creates a build up near the top of the bottle.
    - The player cannot react fast enough with the given fall rate, thus affecting the creation of group lines
    - The player canot medicate the bottle fast enough due to the abundance and variegation of diseases

## <orange>**MVPs**</orange>

- #### <span style="color:mediumpurple">**Features**</span>

  - [ ] Field and positioning of objects
  - [ ] Placement of Diseases with static position
  - [ ] Fall rate and Accelerated Fall Rate
  - [ ] Reactive Gravity and Chain Rule
  - [ ] Removal of group lines
  - [ ] Falling of stacks after removal of group lines
  - [ ] Level Progression with increased difficulty
  - [ ] BONUS: Music Track and Sound Effects
  - [ ] BONUS: 2 Player
  - [ ] SUPER BONUS: 2 Player vs A.I.


- #### <span style="color:mediumpurple">**Functionality**</span>

  - [ ] pill moves left/right with arrow keys
  - [ ] pill instant drops with space bar
  - [ ] pill rotates clockwise with "f" or "UP" input
  - [ ] pill drops faster while holding "DOWN"
  - [ ] pill rotates count-clockwise with "d"

## <orange>**Technology**</orange>

  - HTML5 - base infrastructure
  - Canvas - Visuals
  - Vanilla JavaScript - game logic and build
  - Webpack - bundling and scripts

## <orange>**Implementation & Timeline**</orange>

- #### <span style="color:mediumpurple">**Day 1**</span>

  - [ ] Figure out base structure and design
  - [ ] Study technologies and similar projects for info

- #### <span style="color:mediumpurple">**Day 2**</span>

  - [ ] Generate Field with appropriate spaces and dimensions
  - [ ] Implement game logic for falling state and boundaries
  - [ ] Implement game logic for "stacks" and "stairs"

- #### <span style="color:mediumpurple">**Day 3**</span>

  - [ ] Create Sprite Sheet and decide on visual assets
  - [ ] Design Layout of Background
  - [ ] Composite early stage visuals and link up base logic  

- #### <span style="color:mediumpurple">**Day 4**</span>

  - [ ] Implement game logic for matching colors and removal
  - [ ] Ensure Gravity logic and chain logic persist
  - [ ] Implement Visuals to acompany removal logic

- #### <span style="color:mediumpurple">**Day 5**</span>

  - [ ] Implement Scripting for Game Over or New Game
  - [ ] Work out Menus and Visuals for Menus
  - [ ] Implement Theme Music and Sound Bytes

<!-- </article> -->