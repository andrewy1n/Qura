# What is Qura? 🌐
> Qura is a smart, intuitive, and integrated medicinal information application powered by cutting-edge AI technology.  
> Qura will help users:
> * **Comprehensive Drug Information Access:** Combines an online medicine search engine, NDC number lookup, and drug barcode scanner to provide users with detailed, accurate, and easily accessible information about medications, including proprietary names, dosage forms, and routes of administration.
> * **Risk Analysis & Use Cases:** Integrates medicine interaction risk analysis with sentiment analysis of user experiences to help users avoid adverse drug reactions and make informed decisions based on both clinical data and real-world feedback.
> * **AI-Powered Interactive Chat:** Utilizes AI for generating clear, concise summaries of complex medicinal information and offers an interactive LLM chat feature that delivers personalized responses, making information more understandable and tailored to individual user needs.

# Why did we build Qura? 💊
> In today's complex healthcare environment, managing medication information efficiently can be a significant challenge for individuals and healthcare providers. Traditional methods of obtaining drug information are often cumbersome, incomplete, or outdated. This leads to confusion, potential medication errors, and increased health risks.  
> Moreover, with the vast array of medications available, each with its own set of potential interactions and side effects, maintaining an accurate and personalized medication plan becomes even more complex.  
> Many individuals are often unaware of how their medications interact with each other or with their lifestyle choices, leading to adverse effects and potential health complications. The lack of easily accessible, comprehensive medicinal information exacerbates the difficulty of making informed decisions that align with personal health goals and safety.

# How did we build Qura? 🛠️
### Core Libraries and Tools
> * **React Native:** For building a cross-platform mobile application with a smooth user interface.
> * **Expo:** For streamlining the mobile development and testing process.
> * **TailwindCSS:** For styling and ensuring a consistent, user-friendly design.
> * **OpenAI GPT:** For providing intelligent, context-aware responses in the AI chat feature.

### Barcode Scanner
> A key feature of Qura is the barcode scanner, which allows users to quickly retrieve detailed information about medications by scanning their barcodes. This feature was implemented using the `expo-camera` library to integrate the device's camera functionality.

### Medical Data API
> We use the FDA API to fetch detailed medicinal information, including NDC codes, drug composition, and potential interactions. This ensures that users receive accurate and up-to-date information.

### AI Integration
> **OpenAI GPT:** We integrated OpenAI's GPT-4o-mini model to provide users with intelligent, personalized responses regarding their medications, potential interactions, and lifestyle advice.

# Impacts 💥
> The real-world impacts may include:
> **Improved Patient Health Outcomes:** By providing easy access to detailed drug information, Qura can significantly improve medication adherence, reducing complications from missed or incorrect dosages. Qura’s drug interaction checker and risk analysis tools can help users avoid dangerous drug interactions, leading to fewer adverse drug reactions and hospitalizations.
> **Empowerment and Education of Patients:** Qura provides clear, concise, and understandable information about medications, side effects, and interactions, empowering users to make informed decisions about their health. By offering tailored recommendations and insights, Qura enables users to take control of their health in a way that suits their individual needs and lifestyles.
> **Promotion of Safe and Informed Medication Use:** Qura’s features help ensure that users are taking the correct medications in the proper dosages, and are aware of potential side effects and contraindications, reducing the risk of medication misuse. Users can make more informed decisions about their treatments by understanding the full context of their medications, including the potential benefits and risks.

# What Does the Future Look Like? 🔮

> ## Expanding AI Capabilities
> **Personalized Medication Plans:** AI systems will continue to evolve, offering more sophisticated and specialized capabilities. We will be leveraging this to provide reliable recommendation as accurately as possible.
> **Predictive Analysis of User Health:** We will be integrating personal user trends into predicting the trajectory of user health over time in inclusion with the medication list.

> ## Internet Sentiment Analysis
> **Web Scrapping for internet user anecdotes:** We will be implementing user testimony to provide more nuanced experiences for the user.
> **Garner general opinions about medication:** We will be gathering the internets sentiment about a specific drug, in the hopes it provides more insight to the user.

> ## Deeper Medical Data Connections
> **Develop scanner for ALL NDC barcodes:** So far, only barcodes with numbers are supported, but we hope to partner with scanner providers to cover all ranges of prescription barcodes.
> **Partner with medical database:** There may be richer databases and more specialized ones outside of the FDA that we may connect with.

# Final Thoughts 👋
> Qura isn’t just an app; it’s your partner in navigating the complex world of healthcare. Our goal is to empower you with reliable information and tools that contribute to a safer and healthier lifestyle.

> Looking ahead, we are committed to evolving Qura with continuous improvements and innovations driven by your feedback. Whether you’re a medical professional, a patient juggling multiple prescriptions, or simply someone who values accurate health insights, Qura is designed to be your trusted companion on this journey.

> We appreciate your interest in Qura. Together, we can shape a future where informed decisions and healthy living are within everyone’s reach.

> Curing Doubts, Simplifying Health, Qura. 🌟


**by Tommy, Andrew, John, Jamos**
