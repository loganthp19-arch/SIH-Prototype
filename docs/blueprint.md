# **App Name**: TerraLens

## Core Features:

- Secure Authentication: Implement Firebase Authentication for secure user and admin logins.
- Mining Site Management: Enable users to add new mining locations with associated operational data via a user-friendly form. The system will store the mining site data including sensor readings and LCA results in Firestore.
- Environmental Data Aggregation: Integrate with free APIs (like AQICN) to fetch real-time environmental data, including air quality, weather information, and sensor readings.
- Dashboard Visualization: Use Chart.js to create dynamic dashboards that display real-time environmental data and sustainability metrics.
- Sustainability Analysis Tool: The LLM reasons whether or not it can automatically generate sustainability reports in PDF or CSV format based on available environmental data and site metrics.
- Satellite Imagery Integration: The LLM acts as tool: retrieve and display satellite imagery from sources like Sentinel or NASA to enhance environmental monitoring. It will analyze the image to detect anomalies. 
- Admin Dashboard: Provide an administrative interface to visualize historical and live Life Cycle Assessment (LCA) data for each mining site, with controls to manage user permissions and system settings.

## Style Guidelines:

- Primary color: A deep teal (#008080) evokes environmental responsibility and technological precision.
- Background color: Light gray (#F0F0F0) provides a clean, neutral backdrop to focus on data visualizations.
- Accent color: Soft green (#8FBC8F) complements the teal and emphasizes sustainability themes, useful for interactive elements and alerts.
- Font pairing: 'Space Grotesk' (sans-serif) for headlines and 'Inter' (sans-serif) for body text, for a modern and readable interface.
- Use a set of crisp, line-style icons to represent different environmental metrics and data types, ensuring clarity and ease of understanding.
- Implement a responsive grid layout that adapts to different screen sizes, ensuring a consistent user experience across devices.
- Incorporate subtle animations for data updates and transitions to enhance user engagement without distracting from the data.