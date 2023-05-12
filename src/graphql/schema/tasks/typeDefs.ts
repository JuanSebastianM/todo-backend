export const typeDefs = `#graphql
  # This "Task" type defines the queryable fields for every task in our data source.
  type Task {
    id: ID
    title: String
    description: String
    done: Boolean
  }
  
  type Query {
    getAllTasks: [Task]
  }

  type Mutation {
    createTask(title: String!, description: String): Task
    editTask(id: ID!, title: String, description: String): Task
    editTaskStatus(id: ID!, done: Boolean!): Task
    deleteTask(id: ID!): Task
  }
`;
