#include<iostream>
#include<vector>

using namespace std;

#define DIR false
#define UNDIR true
#define type int

class Graph{
    int vertices;
    vector<vector<type>>adjMatrix;

public:
    Graph(int vertex=3){
        vertices=vertex
        adjMatrix.resize(vertices, vector<type>(vertices,0))
    }

    void addEdge(int row, int column, bool direction= false, int weight =1){
        if(rows>= vertices || row<0 || column >= vertices || column < 0)
        cout <<"\n Out of Bound"<< endl;
    }
    adjMatrix[row][column] =weight
    if(!direction){
        adjMatrix[column][row] = weight
    }
}