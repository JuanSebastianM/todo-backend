// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql

  # This "Task" type defines the queryable fields for every task in our data source.
  type Task {
    id: ID
    title: String
    description: String
    done: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "tasks" query returns an array of zero or more Books (defined above).
  type Query {
    getAllTasks: [Task]
  }

  type Mutations {
    createTask() {

    }
    editTask() {

    }
    deleteTask() {

    }
  }
`;