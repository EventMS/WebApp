

### Subscribe
```
import { GoogleNearby } from '@ionic-native/google-nearby';
subscribtion: any
constructor(private nearby: GoogleNearby) { 
    this.subscribtion = this.nearby.subscribe().subscribe(result => {
        console.log(result)
    })
}
```

### Unubscribe
```
import { GoogleNearby } from '@ionic-native/google-nearby';
constructor(private nearby: GoogleNearby) { }
this.subscribtion.unsubscribe()
```

### Publish
```
import { GoogleNearby } from '@ionic-native/google-nearby';
constructor(private nearby: GoogleNearby) { }
this.nearby.publish(message).then(result => {
    console.log(result)
})
```

# Debug
```shell
adb logcat 
```

# Remove
Cordova
```
cordova plugin rm org.apache.cordova.nearby
```

Ionic
```
ionic cordova plugin rm org.apache.cordova.nearby
```

# Troubleshooting Android
- make sure that the following content is in the AndroidManifest.xml
- make sure that the following content is in the build.gradle file
- make sure you have the requirements from above
- check in the nearby settings if your app is deactivated 

# Notes
For cordova-android v7 and above use version 1.1.5 of this plugin.
