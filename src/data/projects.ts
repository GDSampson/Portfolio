// define the TypeScript interface for a project
interface Project {
    id: number;
    name: string;
    techs: string[];
    description: string;
    photos: string[];
  }
  
  // create the projects array with the interface type
  const projects: Project[] = [
    {
      id: 1,
      name: "Product Review App",
      techs: ["PHP", "JavaScript", "MySQL", "Webpack", "Tailwind", "Docker"],
      description: "The landing page lists all products from the SQL database and allows the user to choose to navigate to a chosen product. When viewing the chosen product, the user will see the product details as well as any previous reviews left for the item. A button can be clicked to toggle access to the review form wherein the user enters their first/last name, a comment and chooses to like/dislike the product via the thumb buttons. Once the user submits, the new review is added to the database and is reflected on the chosen product's details page.",
      photos: [
        "phpReviewDT.png",
        "phpReviewMbl.png",
        "phpProductDT.png",
        "phpProductMbl.png"
      ]
    },
    {
      id: 2,
      name: "Tech Roster Admin App",
      techs: ["Next.js", "TypeScript", "MongoDB", "Tailwind", "Docker", "Webpack"],
      description: "The app draws from a \"course\" collection and a \"technologies\" collection within the MongoDB database. The page is initially rendered as two separate lists of those collections with functionality for the user to add, edit, or delete Courses or Technologies. Depending on the user's action, the page renders appropriate details and forms using React components to update its virtual DOM. This application contains multiple RESTful API endpoints to allow for the user's requests.",
      photos: [
        "techRosterAdd.png",
        "techRosterAddMbl.png",
        "techRosterDelete.png",
        "techRosterDeleteMbl.png",
        "techRosterLand.png",
        "techRosterLandMbl.png"
      ]
    },
    {
      id: 3,
      name: "Photo Album App",
      techs: ["Next.js", "TypeScript", "MongoDB", "Tailwind", "Docker", "Webpack"],
      description: "This app features just one \"photos\" collection. The user can navigate back and forth with the previous/next buttons, as well as use a toggle button to bring up a thumbnail navigation to jump to whatever photo they would like. Comments are populated on the appropriate photo and the user can toggle a small form to submit a comment and their name. The application makes use of only one restful API endpoint to handle the form request when submitted.",
      photos: [
        "photoAlbumLanMbl.png",
        "photoAlbumLand.png",
        "photoAlbumForm.png",
        "photoAlbumFormMbl.png"
      ]
    },
    {
      id: 4,
      name: "QuoteGenerator API App",
      techs: ["ASP.NET Core", "C#", "MySQL", "Bootstrap", "Docker", "Webpack"],
      description: "This project shows that I have built a functioning API with ASP.NET Core. The quote generator application and the API do not interact with one another as I have kept them separate for demonstration purposes. In the application When hitting the API, the user can specify the number of quotes they want the API to generate for them. I've included an example of the JSON having been returned after generating 5 quotes. The generator application itself allows for selecting quotes from a drop down to delete as well as allowing the user to add a quote to the database. Considering the API uses the same database as the app, the number of quotes will be reflected in any API request and new quotes will appear in the API's quote generation.",
      photos: [
        "quoteGenLand.png",
        "quoteGenMbl.png",
        "quoteGenAPIJson.png"
      ]
    },
    {
      id: 5,
      name: "LaunchPad App",
      techs: ["ASP.NET Core", "C#", "MySQL", "Bootstrap", "Docker", "Webpack", "EF Core"],
      description: "This application showcases work that I've done using EF Core and implements a user authentication setup to allow the user to login to make changes to the app. The app functions as a visualized list of links one might want to have at the ready. Each link includes the icon from the website, and an alias, to help convey where the link points to and is categorized to help with organization. Once logged in, the user is brought to the admin page where they can add, edit, and delete links. While editing a link, the user may also choose to pin the link to the top of the category list via a checkbox. One may also edit the Category if needed.",
      photos: [
        "launchpadLand.png",
        "launchpadLandMbl.png",
        "launchpadAdmin.png",
        "launchpadAdminMbl.png",
        "launchpadAddlink.png"
      ]
    }
  ];
  
  export default projects;
  export type { Project };