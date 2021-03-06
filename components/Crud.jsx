import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myDB.db')


//? -----CREATE-----


//* Init the Accounts table
export const createAccountsTable = () => {
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Accounts (ID INTEGER PRIMARY KEY NOT NULL, Username TEXT, Email TEXT, Password TEXT, Connected BOOLEAN);");
    });
}

//* Insert a new account in database
export const insertNewAccount = (username, email, password) => {
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO Accounts (Username, Email, Password, Connected) VALUES (?, ?, ?, ?)", [username, email, password, true], (_, result) => {
            console.log("Result: " + JSON.stringify(result.insertId));
        }, (_, error) => {
            console.log("Error: " + JSON.stringify(error.message));
        });
    });
}


//* Init the Objects table
export const createObjectsTable = () => {
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Objects (ObjectID INTEGER PRIMARY KEY NOT NULL, Name TEXT, UserID INTEGER, Container TEXT, Room INTEGER, Furniture INTEGER, Category INTEGER, Picture TEXT, Status TEXT, Color TEXT, FOREIGN KEY (UserID) REFERENCES Accounts(ID) ON DELETE CASCADE, FOREIGN KEY (Room) REFERENCES Rooms(ID) ON DELETE CASCADE, FOREIGN KEY (Furniture) REFERENCES Furnitures(ID) ON DELETE CASCADE, FOREIGN KEY (Category) REFERENCES Categories(ID) ON DELETE CASCADE)", [], (_, result) => {}, (_, error) => {
            console.log(error);
        });
    });
}

//* Insert a new object in database
export const insertNewObject = async (name, container, roomID, furnitureID, categoryID, picture) => {
    const userID = await getCurrentUserID();
    db.transaction((tx) => {
        console.log(`Name: ${name}, Container: ${container}, RoomID: ${roomID}, FurnitureID: ${furnitureID}, CategoryID: ${categoryID}, Picture: "static URI", userID: ${userID}`);

        tx.executeSql("INSERT INTO Objects (UserID, Name, Container, Room, Furniture, Category, Picture, Status, Color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [userID, name, container, roomID, furnitureID, categoryID, picture, "A SA PLACE", "success"], (_, result) => {
            console.log();
        }, (_, error) => {
            console.log(error);
        });
    });
}


//* Init the Rooms table
export const createRoomsTable = () => {
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Rooms (RoomID INTEGER PRIMARY KEY NOT NULL, Name TEXT)");
    });
}

//* Insert a new room in database
export const insertNewRoom = (name) => {
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO Rooms (Name) VALUES (?)", [name]);
    });
}


//* Init the Categories table
export const createCategoriesTable = () => {
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Categories (CategoryID INTEGER PRIMARY KEY NOT NULL, Name TEXT)");
    });
}

//* Insert a new category in database
export const insertNewCategory = (name) => {
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO Categories (Name) VALUES (?)", [name]);
    });
}


//* Init the Furnitures table
export const createFurnituresTable = () => {
    db.transaction((tx) => {
        tx.executeSql("CREATE TABLE IF NOT EXISTS Furnitures (FurnitureID INTEGER PRIMARY KEY NOT NULL, Name TEXT)");
    });
}

//* Insert a new furniture in database
export const insertNewFurniture = (name) => {
    db.transaction((tx) => {
        tx.executeSql("INSERT INTO Furnitures (Name) VALUES (?)", [name]);
    });
}


//? -----READ-----


//* Get all data from all users
export const getAllAccounts = async () => {
    return new Promise(async resolve => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM Accounts", [], (insertID, rows) => {
                const allAccounts = rows.rows._array;
                resolve(allAccounts);
            });
        });
    });
}

//* Get name, picture and status of all objects  
export const getAllObjects = async () => {
    return new Promise(async resolve => {
        db.transaction((tx) => {
            tx.executeSql("SELECT ObjectID, Objects.Name, Picture, Status, Color, RoomID, FurnitureID, CategoryID FROM Objects INNER JOIN Rooms ON Rooms.RoomID = Objects.Room INNER JOIN Furnitures ON Objects.Furniture = Furnitures.FurnitureID INNER JOIN Categories ON Objects.Category = Categories.CategoryID", [], (insertID, rows) => {
                const allObjects = rows.rows._array;
                resolve(allObjects);
            }, (_, error) => {
                console.log("ERROR: " + error);
            });
        });
    });
}

//* Get all data of one object from its ID
export const getObject = async (id) => {
    return new Promise(async resolve => {
        db.transaction((tx) => {
            tx.executeSql("SELECT Objects.ObjectID, Objects.Name, Container, Picture, Status, Color, Rooms.Name AS RoomName, Furnitures.Name AS FurnitureName, Categories.Name AS CategoryName FROM Objects INNER JOIN Rooms ON Rooms.RoomID = Objects.Room INNER JOIN Furnitures ON Objects.Furniture = Furnitures.FurnitureID INNER JOIN Categories ON Objects.Category = Categories.CategoryID WHERE ObjectID = ?", [id], (insertID, rows) => {
                const object = rows.rows._array;
                resolve(object);
            }, (_, error) => {
                console.log("ERROR: " + error);
            });
        });
    });
}

//* Get all rooms
export const getRooms = async () => {
    return new Promise(async resolve => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM Rooms", [], (insertID, rows) => {
                const rooms = rows.rows._array;
                resolve(rooms);
            });
        });
    });
}

//* Get all categories
export const getCategories = async () => {
    return new Promise(async resolve => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM Categories", [], (insertID, rows) => {
                const categories = rows.rows._array;
                resolve(categories);
            });
        });
    });
}

//* Get all furnitures
export const getFurnitures = async () => {
    return new Promise(async resolve => {
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM Furnitures", [], (insertID, rows) => {
                const furnitures = rows.rows._array;
                resolve(furnitures);
            });
        });
    });
}

export const getCurrentUserID = async () => {
    return new Promise(async resolve => {
        db.transaction((tx) => {
            tx.executeSql("SELECT ID FROM Accounts WHERE Connected = ? LIMIT 1", [true], (insertID, rows) => {
                const id = rows.rows._array[0].ID;
                resolve(id);
            });
        });
    });
}


//? -----UPDATE-----


//* Update one account connexion from an ID
export const updateAccountConnexion = (accountID, connected) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE Accounts SET connected = ? WHERE ID = ?", [connected, accountID]);
    });
}

//* Disconnect all users of database
export const disconnectUsers = () => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE Accounts SET connect = ?", [false]);
    });
}

//* Update one object details from an ID
export const updateObjectDetails = (objectID, name, container, room, furniture, category, picture) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE Objects SET (Name = ?, Container = ?, Room = ?, Furniture = ?, Category = ?, Picture = ?) WHERE ObjectID = ?", [name, container, room, furniture, category, picture, objectID]);
    });
}

//* Update one object status from an ID
export const updateObjectStatus = (objectID, status) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE Objects SET Status = ? WHERE ObjectID = ?", [status, objectID]);
    });
}

//* Update one object color from an ID
export const updateStatusObject = (objectID, color, status) => {
    db.transaction((tx) => {
        tx.executeSql("UPDATE Objects SET Color = ?, Status = ? WHERE ObjectID = ?", [color, status, objectID]);
    });
}


//? -----DELETE-----


//* Delete all accounts of database
export const deleteAllAccounts = () => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM Accounts");
    });
}

//* Delete one account from its ID
export const deleteAccount = (accountID) => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM Accounts WHERE ID = ?", [accountID]);
    });
}

//* Drop Objects table
export const dropObjectsTable = () => {
    db.transaction((tx) => {
        tx.executeSql("DROP TABLE IF EXISTS Objects");
    });
}

//* Delete all objects of database
export const deleteAllObjects = () => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM Objects");
    });
}

//* Delete one object from its ID
export const deleteObject = (objectID) => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM Objects WHERE ObjectID = ?", [objectID]);
    });
}

//* Drop Rooms table
export const dropRoomsTable = () => {
    db.transaction((tx) => {
        tx.executeSql("DROP TABLE IF EXISTS Rooms");
    });
}

//* Delete one room from its ID
export const deleteRoom = (roomID) => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM Rooms WHERE RoomID = ?", [roomID]);
    });
}

//* Drop Categories table
export const dropCategoriesTable = () => {
    db.transaction((tx) => {
        tx.executeSql("DROP TABLE IF EXISTS Categories");
    });
}

//* Delete one category from its ID
export const deleteCategory = (categoryID) => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM Categories WHERE CategoryID = ?", [categoryID]);
    });
}

//* Drop Furnitures table
export const dropFurnituresTable = () => {
    db.transaction((tx) => {
        tx.executeSql("DROP TABLE IF EXISTS Furnitures");
    });
}

//* Delete one furniture from its ID
export const deleteFurniture = (furnitureID) => {
    db.transaction((tx) => {
        tx.executeSql("DELETE FROM Furnitures WHERE FurnitureID = ?", [furnitureID]);
    });
}