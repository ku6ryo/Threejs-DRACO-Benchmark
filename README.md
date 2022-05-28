DRACO compression benchmark with Thee.js

Compared the load time and the render time of a DRACO compressed model and an uncompressed model.

Conclusion: Rendering time is not affected by DRACO compression. However, the load time is shorten by DRACO compress because of the size reduction by DRACO. The render time is the average of 500 runs. The load time is the average of 5 runs. If we have many models and the total file size of our models is large, the load time should be improved. Please not that DRACO is for vertex data and not for textrures. So if you have texture heavy models but the vertex is not heavy, DRACO compression will not work.

| | WO DRACO | W DRACO |
| --- | --- | --- | --- |
| File size | 18 MB | 10 MB |

Device: iPhone 11 (WiFi)
| Param | WO DRACO | W DRACO |
|---|---|---|---|
| Model Load | 1496.4 ms | 1210.2 ms |
| Render | 21.5 ms |  21.3 ms |

Device: Xperia 5 II (Over 5G network)
| Param | WO DRACO | W DRACO |
|---|---|---|---|
| Model Load | 1793.3 ms | 1335.7 ms |
| Render | 17.6 ms | 17.7 ms |


| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| git status   | git status     | git status    |
| git diff     | git diff       | git diff      |


# 3D model
![screenshot](./screenshot.png)

["Mountain King"](https://sketchfab.com/3d-models/mountain-king-2eb21daf408141d1b2df1d91426935ad) by [Pierre-Antoine](https://sketchfab.com/pa) licensed under [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/)