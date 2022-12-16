const MockFirestore = {
  initializeFirestore: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn().mockResolvedValue({
    exists: jest.fn(),
    data: jest.fn(),
    id: jest.fn()
  }),
}

export const initializeFirestore = MockFirestore.initializeFirestore
export const doc = MockFirestore.doc
export const getDoc = MockFirestore.getDoc

export default MockFirestore