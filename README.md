### 👉 Before we start our documentation, I would like to say something. I want to dedicate this whole project to:
  - God, Jesus and Saint Mother;
  - To my beautiful and wonderful family: mom, Nana, Jéssica, Grandpa and Grandma, I love you guys so badly!;
  - And, last but not least, to my incredible teachers: Prof. Lucas Perdigão, Profa. Letícia Porto Soares and Monitor Pedro Souza; 

### Without you all this wouldn't be possible. Thank you!

##

# Mentor Class - Project Documentation

Mentor Class is an application for managing classes and students, designed to streamline the administration of mentors, mentorships, classes, and students. The application was built using JSON Server to simulate the backend and does not rely on any front-end frameworks, developed with HTML, CSS, and pure JavaScript to create the user interface and interactive functionalities.

## Technologies Used in the Project
The Mentor Class application was developed using the following technologies:

- JSON Server: Utilized to simulate the backend and provide endpoints for CRUD (Create, Read, Update, Delete) operations on data.
- HTML, CSS, and JavaScript: Used to create the user interface and implement interactive logic in the application.

## Features

### Login
- Authentication: Users can log in using their credentials, ensuring secure access to the application's features.
- Error Handling: In case of invalid login credentials, appropriate error messages are displayed, allowing users to retry.
- Redirect: After successful login, users are redirected to the main dashboard to manage mentors, mentorships, classes, and students.

### Sign-up (New Users)
- Registration Form: New users can sign up for the application by filling out a registration form with required information such as name, email, and password.
- Input Validation: The sign-up form validates user input to ensure all necessary fields are completed and that the email is in the correct format.
- Error Handling: If there are any errors in the sign-up form, appropriate error messages are displayed, allowing users to correct their input.
- Successful Registration: Upon successful sign-up, users are registered in the system (localStorage) and can proceed to log in with their newly created credentials.

...

The login and sign-up screens are vital components of the Mentor Class application, providing secure access to authorized users and allowing new users to create accounts to use the platform's features. The login screen ensures that only registered users can access the application, while the sign-up screen enables new users to join and participate in mentorship management.

---

### Mentors
- Listing: View all registered mentors in the system, displaying relevant information such as name, email, and other pertinent details. Pagination allows users to navigate through multiple pages of mentor listings.
- Add New: Add new mentors to the system by providing their information, such as name and email. The input fields are validated to ensure all required information is provided before submitting the form.
- Edit: Update the data of an existing mentor in the system, allowing modifications to information like name and email.
- Delete: Remove a mentor from the system.
- Search: Offer the ability to search for mentors based on specific criteria, such as name or email. The search bar allows users to quickly find mentors based on their input.

### Mentorships
- Listing: Display all registered mentorships in the system, with relevant details such as title and mentorship details. Pagination allows users to navigate through multiple pages of mentorship listings.
- Add New: Add new mentorships by providing information such as title, description, and other relevant details. The input fields are validated to ensure all required information is provided before submitting the form.
- Edit: Update the data of an existing mentorship in the system, allowing modifications to information like title and description.
- Delete: Remove a mentorship from the system.
- Search: Allow searching for mentorships based on specific criteria, such as title or description. The search bar allows users to quickly find mentorships based on their input.

### Classes
- Listing: View all registered classes in the system, displaying relevant information such as class name, mentor, and schedule. Pagination allows users to navigate through multiple pages of class listings.
- Add New: Add new classes to the system by providing information such as class name, mentor, and schedule. The input fields are validated to ensure all required information is provided before submitting the form.
- Edit: Update the data of an existing class in the system, allowing modifications to information like class name, mentor, and schedule.
- Delete: Remove a class from the system.
- Search: Offer the ability to search for classes based on specific criteria, such as class name or mentor. The search bar allows users to quickly find classes based on their input.
- Sorting: Provide sorting options to arrange classes based on criteria such as class name, mentor, and schedule.

### Students
- Listing: Display all registered students in the system, with relevant information such as name, email, and class enrollment. Pagination allows users to navigate through multiple pages of student listings.
- Add New: Add new students to the system by providing their information, such as name, email, and class enrollment. The input fields are validated to ensure all required information is provided before submitting the form.
- Edit: Update the data of an existing student in the system, allowing modifications to information like name, email, and class enrollment.
- Delete: Remove a student from the system.
- Search: Allow searching for students based on specific criteria, such as name or email. The search bar allows users to quickly find students based on their input.

---
