import OHIFVTKViewport from "@ohif/extension-vtk";
import { installViewer } from "@ohif/viewer";
import React, { useEffect, useRef } from "react";

export default function ImageViewer() {
  const ohifViewer = useRef(null);

  const ohifViewerConfig = {
    routerBasename: "/image-viewer",
    extensions: [OHIFVTKViewport],
    servers: {
      dicomWeb: [
        {
          name: "DCM4CHEE",
          wadoUriRoot:
            "https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/wado",
          qidoRoot: "https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs",
          wadoRoot: "https://server.dcmjs.org/dcm4chee-arc/aets/DCM4CHEE/rs",
          qidoSupportsIncludeField: true,
          imageRendering: "wadors",
          thumbnailRendering: "wadors",
          enableStudyLazyLoad: true,
        },
      ],
    },
  };
  const containerId = "ohif";
  const componentRenderedOrUpdatedCallback = () => {
    console.log("OHIF Viewer rendered/updated");
  };

  useEffect(() => {
    installViewer(
      ohifViewerConfig,
      containerId,
      componentRenderedOrUpdatedCallback
    );
  }, []);

  return <div id="ohif" ref={ohifViewer}></div>;
}
