import { defineStore } from 'pinia'

export interface Collection {
  id: string
  name: string
  resourceIds: string[]
  createdAt: string
}

export const useCollectionsStore = defineStore(
  'collections',
  () => {
    const collections = ref<Collection[]>([])

    function createCollection(name: string) {
      const collection: Collection = {
        id: 'col-' + Date.now(),
        name,
        resourceIds: [],
        createdAt: new Date().toISOString(),
      }
      collections.value.push(collection)
      return collection
    }

    function deleteCollection(id: string) {
      collections.value = collections.value.filter((c) => c.id !== id)
    }

    function getById(id: string) {
      return collections.value.find((c) => c.id === id)
    }

    function addResource(collectionId: string, resourceId: string) {
      const collection = getById(collectionId)
      if (collection && !collection.resourceIds.includes(resourceId)) {
        collection.resourceIds.push(resourceId)
      }
    }

    function removeResource(collectionId: string, resourceId: string) {
      const collection = getById(collectionId)
      if (collection) {
        collection.resourceIds = collection.resourceIds.filter((id) => id !== resourceId)
      }
    }

    return {
      collections,
      createCollection,
      deleteCollection,
      getById,
      addResource,
      removeResource,
    }
  },
  { persist: true },
)
