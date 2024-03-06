#include<iostream>
using namespace std;
int main()
{
    int n;
    cout<<"enter a number";
    cin>>n;
    int cond;
    for(int i=1;i<2*n;i++){
        cond= i<=n?i:2*n-i;
        for(int j=1;j<=cond;j++){
            cout<<"*";
        }
        cout<<endl;
    }
}