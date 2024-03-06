#include<iostream>
using namespace std;
int main()
{
    int n,start,count;
    cout<<"enter a number";
    cin>>n;
    if(n>9){
        cout<<"num cant be greater than 9";
        return 0;
    }
    for(int i=1;i<=n;i++){
        start= 9-i+1;
        count=i;
        for(int j=1;j<=17;j++){
            if(j==start&&count>0){
                cout<<i;
                start+=2;
                count--;
            }
            else{
                cout<<"*";
            }
        }
        cout<<endl;
    }
}