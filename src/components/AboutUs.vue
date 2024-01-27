<template>
  <div class="team-section">
    <h2>关于我们的团队</h2>
    <div class="team-members">
      <div class="team-member" v-for="member in teamMembers" :key="member.name">
        <h3>{{ member.name }}</h3>
        <p>{{ member.role }}</p>
        <p>{{ member.description }}</p>
      </div>
    </div>
  </div>
</template>





<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      teamMembers: [
        { name: '熊峰', role: '产品＆市场负责人', description: '目前负责市场营销和用户洞察' },
        { name: '沈亦扬', role: '技术团队', description: '目前负责前端网页设计和构建' },
        { name: '任相宇', role: '技术团队', description: '目前负责前端网页设计和构建' },
        { name: '吴军涵', role: '宣传团队', description: '目前负责产品的文字推广' }
      ]
    };
  }
}
</script>


<style>
.team-section {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  padding-top: 0;
}

.team-section h2 {
  margin-bottom: 30px;
}

.team-members {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.team-member {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: left;
  width: 250px;
}

.team-member h3 {
  color: #0056b3;
  margin-top: 0;
}

.team-member p {
  color: #666;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .team-members {
    flex-direction: column;
    align-items: center;
  }

  .team-member {
    width: 100%;
  }
}
</style>
