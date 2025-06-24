export const TopicManager = {
  async getTopic(id: string) {
    // return await db.topics.get(id)
    return
  },

  async getAllTopics() {
    // return await db.topics.toArray()
    return
  },

  async getTopicMessages(id: string) {
    // const topic = await TopicManager.getTopic(id)
    // return topic ? topic.messages : []
    return
  },

  async removeTopic(id: string) {
    // const messages = await TopicManager.getTopicMessages(id)

    // for (const message of messages) {
    //   await deleteMessageFiles(message)
    // }

    // db.topics.delete(id)
    return
  },

  async clearTopicMessages(id: string) {
    //   const topic = await TopicManager.getTopic(id)

    //   if (topic) {
    //     for (const message of topic?.messages ?? []) {
    //       await deleteMessageFiles(message)
    //     }

    //     topic.messages = []

    //     await db.topics.update(id, topic)
    //   }
    // }
    return
  }
}
