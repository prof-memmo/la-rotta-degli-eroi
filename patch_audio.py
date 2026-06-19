import re

with open("js/app.js", "r") as f:
    content = f.read()

if "toggleAudio: function() {" not in content:
    # Add toggleAudio to EroiApp
    content = content.replace("init: function() {", "toggleAudio: function() {\n      EroiAudio.toggleMute();\n    },\n\n    init: function() {")

with open("js/app.js", "w") as f:
    f.write(content)
print("Patched app.js to expose toggleAudio")
