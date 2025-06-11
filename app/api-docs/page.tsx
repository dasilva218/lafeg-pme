'use client';

import React, { useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function ApiDocs() {
  const [specs, setSpecs] = useState(null);

  useEffect(() => {
    fetch('/api/swagger')
      .then(response => response.json())
      .then(data => setSpecs(data));
  }, []);

  if (!specs) {
    return <div>Chargement de la documentation...</div>;
  }

  return (
    <div className="swagger-container">
      <SwaggerUI spec={specs} />
    </div>
  );
}