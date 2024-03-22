// import React from "react";
// import { View, Text, StyleSheet, Image } from "react-native";
// import {
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
//   widthPercentageToDP as wp,
// } from "react-native-responsive-screen";
// import Graph from "../components/Graph";

// const ProfileScreen = () => {
//   // Dummy user data for testing
//   const user = {
//     name: "Alwin Tomy",
//     email: "alwintomy11@gmail.com",
//     // avatar: require('../assets/avatar.png'), // Assuming you have an avatar image
//     bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at libero arcu.",
//   };

//   return (
//     // <View style={styles.container}>
//     //   <Image source={user.avatar} style={styles.avatar} />
//     //   <Text style={styles.name}>{user.name}</Text>
//     //   <Text style={styles.email}>{user.email}</Text>
//     //   <Text style={styles.bio}>{user.bio}</Text>
//     // </View>
//     <View className=" flex flex-col gap-5 bg-black h-full py-10 items-center justify-start">
//       <View
//         className=" flex flex-row  p-5 shadow bg-white rounded-lg"
//         style={{ width: wp("100%") }}
//       >
//         <Image
//           className="rounded-lg"
//           source={require("../assets/loginBG.png")}
//           style={{ width: hp("10%"), height: hp("10%") }}
//         />
//         <View>
//           <Text className="font-semi text-lg px-2 ">Alwin</Text>
//           <Text className="font-semi text-sm px-2 ">alwin@gmail.com</Text>
//           <Text className="font-semi text-sm px-2 ">+91 8765456787</Text>
//         </View>
//       </View>
//       <View
//         className="px-20 shadow rounded-lg"
//         // style={{ width: wp("90%")}}
//       >
//       <Graph/>
//       </View>
//     </View>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     paddingHorizontal: 20,
// //   },
// //   avatar: {
// //     width: 150,
// //     height: 150,
// //     borderRadius: 75,
// //     marginBottom: 20,
// //   },
// //   name: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   email: {
// //     fontSize: 18,
// //     marginBottom: 10,
// //   },
// //   bio: {
// //     fontSize: 16,
// //     textAlign: 'center',
// //   },
// // });

// export default ProfileScreen;





import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Dummy user data for testing
const user = {
  name: 'Alwin Tomy',
  email: 'alwintomy11@gmail.com',
  avatar: require('../assets/profile.png'), // Assuming you have an avatar image
  bio: 'Previous Month Analytics',
};

// Dummy analytics data for testing
const analyticsData = [
  { category: 'Academics/Profession', value: 20 },
  { category: 'Personal', value: 30 },
  { category: 'Social', value: 40 },
  { category: 'General', value: 50 },
];

const ProfileScreen = () => {
  // Automated feedback for each category
  const feedback = [
    'Your efficiency in academic or professional tasks appears to be moderate. Consider allocating more time or effort to these areas for improved performance.',
    'You\'ve dedicated a reasonable amount of time to personal activities. Keep maintaining a healthy balance between personal and other aspects of your life.',
    'Your social engagement seems to be quite active, reflecting a good level of social interaction. Continue nurturing your social connections.',
    'A significant portion of your time is spent on general tasks. Consider prioritizing tasks or organizing your activities more efficiently to optimize productivity.',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={user.avatar} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <Text style={styles.bio}>{user.bio}</Text>
      
      {/* Line chart for analytics */}
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: analyticsData.map(item => item.category),
            datasets: [{
              data: analyticsData.map(item => item.value),
            }],
          }}
          width={350}
          height={200}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Feedback for each category */}
      <View style={styles.feedbackContainer}>
        {feedback.map((text, index) => (
          <Text key={index} style={styles.feedbackText}>{`${analyticsData[index].category}: ${text}`}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
  bio: {
    fontSize: 16,
    marginTop: 50,
    textAlign: 'center',
    color: 'white',
  },
  chartContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackText: {
    color: 'white',
    marginBottom: 10,
  },
});

export default ProfileScreen;
