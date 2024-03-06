#include<iostream>
using namespace std;
int main()
{
    int n;
    cout<<"enter a number";
    cin>>n;
    for(int i=n;i>=1;i--){
        for(int j=1;j<=i;j++){
            if(i==n){
                cout<<j<<" ";
            }
            else if(j==1){
                cout<<n-i+1<<" ";
            }
            else if(j==i){
                cout<<n<<" ";
            }
            else{
                cout<<" ";
            }
        }
        cout<<endl;
    }
    return 0;

}