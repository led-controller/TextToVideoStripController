import time
from tkinter import Canvas, Tk

print("Hello");

rawAnimation = open("./animation.txt", mode="r", encoding="UTF8");
line = rawAnimation.readline()

cellW = 10
cellH = 10

if line:
  gui = Tk()
  canvas = Canvas(gui, bg="white", height=100, width=1800)
  canvas.pack()

  while line:
    curLed = 0
    leds = line.split(";")  

    canvas.delete("all")
    for led in leds:
      if led and not led == "\n":
        led = led.split(",")

        #print(led)
        color = "#" + "{:02x}".format(round(float(led[0]))) + "{:02x}".format(round(float(led[1]))) + "{:02x}".format(round(float(led[2])))
        #print(color)

        canvas.create_rectangle(curLed * cellW * 2, 60, curLed * cellW * 2 + cellW, 60 + cellH, fill=color)
        curLed += 1
    
    gui.update()
    line = rawAnimation.readline()
    time.sleep(.05)
  gui.mainloop()

print("Done")