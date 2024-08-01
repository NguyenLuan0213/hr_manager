export interface Department {
    id: number;
    nameDepartment: string;   
}

let mockDepartment: Department[] = [
    {
        id: 1,
        nameDepartment: "Phòng kế toán"
    },
    {
        id: 2,
        nameDepartment: "Phòng CNTT"
    },
    {
        id: 3,
        nameDepartment: "Phòng Truyền thông"
    },
];

export const getMockDepartment = (): Department[] => {
    return mockDepartment;
};