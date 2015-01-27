//
//  GVRInterface.cpp
//  gvr-interface/src
//
//  Created by Stephen Birarda on 11/18/14.
//  Copyright 2013 High Fidelity, Inc.
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//

#include <QtAndroidExtras/QAndroidJniEnvironment>
#include <QtAndroidExtras/QAndroidJniObject>
#include <QtCore/QTimer>
#include <qpa/qplatformnativeinterface.h>
#include <QtWidgets/QMenuBar>

#include <GlUtils.h>
#include <VrApi/LocalPreferences.h>
#include <VrApi/VrApi.h>
#include <VrApi/VrApi_local.h>

#include "GVRMainWindow.h"
#include "RenderingClient.h"

#include "GVRInterface.h"

GVRInterface::GVRInterface(int argc, char* argv[]) : 
    QApplication(argc, argv),
    _inVRMode(false)
{
    _client = new RenderingClient(this);
    
    connect(this, &QGuiApplication::applicationStateChanged, this, &GVRInterface::handleApplicationStateChange);
    
    QAndroidJniEnvironment jniEnv;
    
    QPlatformNativeInterface* interface = QApplication::platformNativeInterface();
    jobject activity = (jobject) interface->nativeResourceForIntegration("QtActivity");

    ovr_RegisterHmtReceivers(&*jniEnv, activity);
    
    // call our idle function whenever we can
    QTimer* idleTimer = new QTimer(this);
    connect(idleTimer, &QTimer::timeout, this, &GVRInterface::idle);
    idleTimer->start(0);
    
    // // setup our EGL context
  //   const int windowDepth = 0;
  //   const int windowSamples = 0;
  //   const GLuint contextPriority = EGL_CONTEXT_PRIORITY_MEDIUM_IMG;
  //   OVR::eglSetup_t egl = OVR::EglSetup(EGL_NO_CONTEXT, GL_ES_VERSION,
  //       8, 8, 8, windowDepth, windowSamples, contextPriority);
  //
  //   if (egl.context == EGL_NO_CONTEXT) {
  //       qDebug() << "WE HAD SOME DIFFICULTIES SETTING UP EGL!";
  //   } else {
  //       qDebug() << "EGL is good to go.";
  //   }
}

void GVRInterface::idle() {
    if (!_inVRMode && ovr_IsHeadsetDocked()) {
        qDebug() << "The headset just got docked - assume we are in VR mode.";
        _inVRMode = true;
    } else if (_inVRMode) {
        if (ovr_IsHeadsetDocked()) {
            static int counter = 0;
            
            // Get the latest head tracking state, predicted ahead to the midpoint of the time
            // it will be displayed.  It will always be corrected to the real values by
            // time warp, but the closer we get, the less black will be pulled in at the edges.
            const double now = ovr_GetTimeInSeconds();
            static double prev;
            const double rawDelta = now - prev;
            prev = now;
            const double clampedPrediction = std::min( 0.1, rawDelta * 2);
            ovrSensorState sensor = ovrHmd_GetSensorState(OvrHmd, now + clampedPrediction, true );   
            
            auto ovrOrientation = sensor.Predicted.Pose.Orientation;
            glm::quat newOrientation(ovrOrientation.w, ovrOrientation.x, ovrOrientation.y, ovrOrientation.z);
            _client->setOrientation(newOrientation);
            
            if (counter++ % 100000 == 0) {
                qDebug() << "GetSensorState in frame" << counter << "-" 
                    << ovrOrientation.x <<  ovrOrientation.y <<  ovrOrientation.z <<  ovrOrientation.w;
            }
        } else {
            qDebug() << "The headset was undocked - assume we are no longer in VR mode.";
            _inVRMode = false;
        }
    } 
}

void GVRInterface::handleApplicationStateChange(Qt::ApplicationState state) {
    switch(state) {
        case Qt::ApplicationActive:
            qDebug() << "The application is active.";
            break;
        case Qt::ApplicationSuspended:
            qDebug() << "The application is being suspended.";
            break;
        default:
            break;
    }
}
